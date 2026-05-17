import { AlertCircle } from "lucide-react";

export function ErrorNotice({
  title = "読み込みに失敗しました",
  message
}: {
  title?: string;
  message: string;
}) {
  return (
    <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-800">
      <p className="flex items-center gap-2 font-bold">
        <AlertCircle size={17} aria-hidden />
        {title}
      </p>
      <p className="mt-2 leading-6">{message}</p>
    </div>
  );
}
