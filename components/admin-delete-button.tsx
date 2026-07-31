"use client";

export function AdminDeleteButton({ id, action, label }: { id: string; action: (formData: FormData) => void | Promise<void>; label: string }) {
  return (
    <form action={action} onSubmit={(event) => { if (!window.confirm("Esta acción no se puede deshacer. ¿Querés continuar?")) event.preventDefault(); }}>
      <input type="hidden" name="id" value={id} />
      <button className="admin-delete-button" type="submit">{label}</button>
    </form>
  );
}
