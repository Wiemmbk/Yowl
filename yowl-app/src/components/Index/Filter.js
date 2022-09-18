function Filter(props) {
  return (
    <select
      defaultValue="Sort"
      onChange={props.handleSort}
      className="flex flex-col justify-between items-center w-full bg-cream font-Poppins text-xl outline-none text-light-purple border-b-[3px] border-light-purple dark:border-cream border-dashed px-1 py-1"
    >
      <option
        disabled
        value="Sort"
        className="font-Poppins text-sm bg-light-purple dark:bg-purple text-cream"
      >
        Filter By
      </option>
      <option
        value="Newest"
        className="font-Poppins text-sm bg-light-purple dark:bg-purple text-cream"
      >
        Newest
      </option>
      <option
        value="Oldest"
        className="font-Poppins text-sm bg-light-purple dark:bg-purple text-cream"
      >
        Oldest
      </option>
    </select>
  );
}

export default Filter;
