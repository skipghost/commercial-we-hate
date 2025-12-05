"use client";

import { useCallback, useEffect, useState } from "react";

import { DropzoneOptions } from "react-dropzone";
import { useFormContext } from "react-hook-form";

import { useEdgeStore } from "@/lib/edgestore";

import { FileState, MultipleFileUploader } from "@/components/multi-file-uploader";

import { AttachmentParams } from "@/types";

import CustomFormField from "../form-field";

interface MultiFileUploaderFieldProps {
  name: string;
  label?: string;
  dropzoneOptions?: Omit<DropzoneOptions, "disabled">;
  acceptedFiles?: string;
}

const MultiFileUploaderField = ({ name, label, ...rest }: MultiFileUploaderFieldProps) => {
  const { edgestore } = useEdgeStore();
  const { setValue } = useFormContext();

  const [fileStates, setFileStates] = useState<FileState[]>([]);

  const updateFileProgress = useCallback((key: string, progress: FileState["progress"]) => {
    setFileStates((prev) => prev.map((file) => (file.key === key ? { ...file, progress } : file)));
  }, []);

  useEffect(() => {
    const attachments: AttachmentParams[] = fileStates
      .filter((file) => file.url)
      .map((file) => ({
        url: file.url as string,
        size: file.file.size,
        filename: file.file.name,
        type: file.file.type,
      }));

    setValue(name, attachments);
  }, [fileStates, setValue]);

  const handleFileUpload = useCallback(
    async (addedFiles: FileState[]) => {
      setFileStates((prev) => [...prev, ...addedFiles]);

      for (const file of addedFiles) {
        try {
          const res = await edgestore.publicFiles.upload({
            options: { temporary: true, manualFileName: file.file.name },
            file: file.file,
            onProgressChange: async (progress) => {
              updateFileProgress(file.key, progress);
              if (progress === 100) {
                await new Promise((r) => setTimeout(r, 1000));
                updateFileProgress(file.key, "COMPLETE");
              }
            },
          });

          setFileStates((prev) => prev.map((state) => (state.key === file.key ? { ...state, url: res.url } : state)));
        } catch {
          updateFileProgress(file.key, "ERROR");
        }
      }
    },
    [edgestore, updateFileProgress]
  );

  return (
    <CustomFormField
      name={name}
      label={label}
    >
      <MultipleFileUploader
        value={fileStates}
        onFilesAdded={handleFileUpload}
        {...rest}
      />
    </CustomFormField>
  );
};

export default MultiFileUploaderField;

