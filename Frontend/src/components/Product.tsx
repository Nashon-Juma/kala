import { FC } from "react"
import { CiHardDrive } from "react-icons/ci"
import { FaRegHeart } from "react-icons/fa";
import { CiShoppingBasket } from "react-icons/ci";
const Product: FC = () => {

    return (
        <div className="max-w-[316px] relative w-full bg-secondary-black border-t-4 border-dark-red rounded-xl p-3 overflow-hidden text-white text-sm">

            {"w" ? <div className=" flex-center absolute bg-[#EE273A] size-9 text-white pt-1 text-sm disscount-border">۳%</div> : null}

            <img className="m-auto object-cover my-3 cursor-pointer" src="images/victus-15.webp" alt="product-name" />

            {"w" &&
                <div className="flex items-center gap-3 justify-center text-title-text text-sm">
                    <div className="red-line-through text-white ">12,233,433</div>
                    <div className="text-blue-white">12,664,473 <span className="text-[10px] text-title-text">تومان</span></div>
                </div>
            }

            <p className="text-center px-3 transition-all line-clamp-2 hover:text-blue-dark duration-300 cursor-pointer text-title-text break-all leading-[25px] my-4 ">لپ تاپ ایسوس R565EP i7-1165G7/8GB/512GB/MX330-2G</p>

            <div className="grid grid-cols-4 gap-2 ch:bg-primary-black ch:rounded-md ch-gap-1">

                <div className="flex-center flex-col py-[6px] gap-1 ch:size-5"> <CiHardDrive /> <p className="text-blue-white">512</p></div>
                <div className="flex-center flex-col py-[6px] gap-1 ch:size-5"> <CiHardDrive /> <p className="text-blue-white">512</p></div>
                <div className="flex-center flex-col py-[6px] gap-1 ch:size-5"> <CiHardDrive /> <p className="text-blue-white">512</p></div>
                <div className="flex-center flex-col py-[6px] gap-1 ch:size-5"> <CiHardDrive /> <p className="text-blue-white">512</p></div>
            </div>

            <div className="flex items-center gap-3 mt-4 text-description-text ch:cursor-pointer ch:size-8">
                <CiShoppingBasket className="bg-primary-black p-[3px] rounded-full " />
                <FaRegHeart className="p-[6px]" />
            </div>
        </div>
    )
}

export default Product