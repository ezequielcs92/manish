"use client";

import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

async function uploadImage(blobInfo: { blob: () => Blob; filename: () => string }) {
  const body = new FormData();
  body.set("file", blobInfo.blob(), blobInfo.filename());
  const response = await fetch("/api/admin/upload", { method: "POST", body });
  const result = await response.json() as { url?: string; error?: string };
  if (!response.ok || !result.url) throw new Error(result.error ?? "No se pudo subir la imagen");
  return result.url;
}

export function AdminRichEditor({ name, initialValue = "" }: { name: string; initialValue?: string }) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="admin-rich-editor">
      <input type="hidden" name={name} value={value} />
      <Editor
        id={`manish-editor-${name}`}
        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
        value={value}
        onEditorChange={setValue}
        init={{
          height: 620,
          menubar: "edit view insert format tools table help",
          skin: "oxide-dark",
          content_css: "dark",
          plugins: "advlist autolink autosave charmap code codesample directionality fullscreen help image insertdatetime link lists media nonbreaking pagebreak preview quickbars searchreplace table visualblocks wordcount",
          toolbar: [
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | forecolor backcolor | removeformat",
            "alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent | link image media table | blockquote codesample | charmap insertdatetime | searchreplace visualblocks preview fullscreen code help",
          ],
          toolbar_mode: "sliding",
          font_family_formats: "Poppins=Poppins,Arial,sans-serif; Arial=Arial,sans-serif; Georgia=Georgia,serif; Courier New=Courier New,Courier,monospace",
          font_size_formats: "12px 14px 16px 18px 20px 24px 30px 36px 48px",
          block_formats: "Párrafo=p; Título 2=h2; Título 3=h3; Título 4=h4; Cita=blockquote; Código=pre",
          quickbars_selection_toolbar: "bold italic underline | forecolor | link blockquote",
          quickbars_insert_toolbar: "image media table hr",
          contextmenu: "link image table",
          browser_spellcheck: true,
          automatic_uploads: true,
          images_upload_handler: uploadImage,
          image_caption: true,
          image_advtab: true,
          link_default_target: "_blank",
          link_assume_external_targets: true,
          autosave_ask_before_unload: true,
          autosave_interval: "30s",
          autosave_retention: "30m",
          branding: false,
          promotion: false,
          content_style: "body { font-family: Poppins, Arial, sans-serif; font-size: 16px; line-height: 1.75; } img { max-width: 100%; height: auto; } blockquote { border-left: 3px solid #7772ff; margin-left: 0; padding-left: 18px; }",
        }}
      />
    </div>
  );
}
