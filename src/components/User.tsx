import React from "react";

const User = () => {
  return (
    <div className='bg-white w-full h-fit flex flex-col pt-7 pb-16 px-4 gap-3 rounded-t-md border-b-4 border-gray-500'>
      <h1 className='text-[27px]'>Invoice</h1>
      <div className='w-full h-fit flex flex-col text-[15px]'>
        <h1 className='text-[13px]'>Date:</h1>
        <p>04 Jul, 2024</p>
      </div>
      <div className='flex items-center justify-between'>
        <div className='w-full h-fit flex flex-col text-[15px]'>
          <h1 className='text-[13px]'>Biiled from:</h1>
          <p>Hospital test</p>
        </div>
        <div className='w-full h-fit flex flex-col text-[15px]'>
          <h1 className='text-[13px]'>Billed to:</h1>
          <p>Emmnual Afolabi</p>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <div className='w-full h-fit flex flex-col text-[15px]'>
          <h1 className='text-[13px]'>Service Provider</h1>
          <p>Hospital Test</p>
          <p>Lekki, Lagos Nigeria</p>
          <p>08132556677</p>
        </div>
        <div className='w-full h-fit flex flex-col text-[15px]'>
          <h1 className='text-[13px]'>Patient Details</h1>
          <p>Emmanuel Afolabi</p>
          <p>08132556677</p>
        </div>
      </div>
    </div>
  );
};

export default User;
