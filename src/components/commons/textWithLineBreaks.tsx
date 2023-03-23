export function TextWithLineBreaks({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((part, i) => (
        <span key={i}>
          {part}
          <br />
        </span>
      ))}
    </>
  );
}
