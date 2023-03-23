declare module "html2pdf.js" {
  export default function html2pdf(
    _src: HTMLElement | null,
    _opt: any
  ): { save: () => {} };
}
