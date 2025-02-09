import type { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="pb-6">
      <div className="container">
        <p className="text-balance text-center text-muted-foreground text-sm leading-loose md:text-left">
          Built by{" "}
          <a
            href="https://morello.dev"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Dennis Morello
          </a>{" "}
          for educational purposes only. Source code available on{" "}
          <a
            href="https://github.com/morellodev/investment-simulator"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
};
