export default function NavbarRoom() {
  return (
    <div className="bg-[#FFFFFF] p-5 pl-16 pr-16 border-b-[1px] border-[#E4E6ED]  flex justify-between">
      <h1 className="font-body text-xl font-semibold flex flex-col justify-center ">
        Room Management
      </h1>
      <div className="relative  w-[20%]">
        <img src="/img/search.svg" className="absolute left-2 top-2"></img>
        <input
          className="border-[1px] border-[#D6D9E4] rounded-sm placeholder:font-body placeholder:text-[#9AA1B9] 
    placeholder:text-[16px] placeholder:font-normal tracking-tighter p-2 pl-10  w-full "
          type="text"
          placeholder="Search..."
        ></input>
      </div>
    </div>
  );
}
