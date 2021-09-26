const capitalize = (name) => {
    return name
      .split(" ")
      .map((str) =>
        str.length <= 2
          ? str
          : str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
      )
      .join(" ");
  };

  export default capitalize