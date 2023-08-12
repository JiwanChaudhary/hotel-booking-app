import React, { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

const Loader = () => {
  let [loading, setLoading] = useState(true);
  return (
    <div className="text-center py-20">
      <PulseLoader
        color={"#0000ff"}
        // loading={loading}
        size={10}
      />
    </div>
  );
};

export default Loader;
