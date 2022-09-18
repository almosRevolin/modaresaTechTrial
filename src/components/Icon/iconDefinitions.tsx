const iconDefinitions: IconDefinition = {
  close: {
    viewBox: "0 0 20 20",
    path: (
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    ),
  },
  plus: {
    viewBox: "0 0 12 12",
    path: (
      <path d="M10.5 6.75H6.75V10.5C6.75 10.9125 6.4125 11.25 6 11.25C5.5875 11.25 5.25 10.9125 5.25 10.5V6.75H1.5C1.0875 6.75 0.75 6.4125 0.75 6C0.75 5.5875 1.0875 5.25 1.5 5.25H5.25V1.5C5.25 1.0875 5.5875 0.75 6 0.75C6.4125 0.75 6.75 1.0875 6.75 1.5V5.25H10.5C10.9125 5.25 11.25 5.5875 11.25 6C11.25 6.4125 10.9125 6.75 10.5 6.75Z" />
    ),
  },
};

type IconDefinition = {
  [key: string]: Icon;
};

type Icon = {
  viewBox?: string;
  path: JSX.Element;
  stroke?: string;
};

export default iconDefinitions;
