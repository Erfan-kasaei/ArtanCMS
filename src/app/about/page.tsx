import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">درباره ما</h1>
      <p className="mt-4 text-lg">این یک پروژه با نکست ۱۵ است.</p>
      <Button variant="default">کلیک کن!</Button>
    </div>
  );
}
