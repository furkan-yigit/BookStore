import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="w-16 h-16 border-4 border-sky-600 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
