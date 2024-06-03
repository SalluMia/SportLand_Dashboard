import React from "react";

function Loading() {
  return (
    <div class="flex flex-col items-center justify-center h-screen">
      <div class="relative ">
        <div class="h-24 w-24 bg-white rounded-full border-t-4 border-b-4 border-gray-300 "></div>
        <div class="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-primary dark:border-accentDark animate-spin"></div>
      </div>
      <p className="text-dark dark:text-white mt-6 animate-ping">
        Head Start
      </p>
    </div>
  );
}

export default Loading;
