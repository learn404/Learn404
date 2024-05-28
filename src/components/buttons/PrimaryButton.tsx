interface Props {
  children: String;
}

export default function PrimaryButton(props: { children: Props["children"] }) {
  return (
    <button
      type="submit"
      className="flex-none rounded-md bg-indigo-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    >
      {props.children}
    </button>
  );
}
