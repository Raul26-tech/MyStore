import { BsCart3 } from 'react-icons/bs';
import { HiMenu } from 'react-icons/hi';
import { BiUser } from 'react-icons/bi';
import { useAuth } from '../../hooks/useAuth';
import { useBuyCart } from '../../hooks/useBuyCart';

interface IHeaderProps {
    openMenu: () => void;
}

export default function Header({ openMenu }: IHeaderProps) {
    const { user } = useAuth();
    const { quantityProductAdded } = useBuyCart();

    return (
        <>
            <header className="w-full h-16 md:h-24 p-3 flex justify-end items-center shadow-xl">
                <button className="w-full h-full flex justify-start items-center p-6">
                    <HiMenu size={30} onClick={openMenu} />
                </button>
                <div className="w-full flex justify-end items-center">
                    <div className="h-auto flex justify-end items-center md:p-2 space-x-5">
                        <div className="flex w-[5rem] md:w-auto h-[2rem] md:h-12 space-x-3">
                            <div className="flex justify-center items-center">
                                <span>{user?.name}</span>
                            </div>
                            <div className="hidden w-[3rem] md:flex justify-center items-center bg-theme-blue-50 p-2 rounded-full">
                                <BiUser className="w-full h-9 md:h-12 text-white" />
                            </div>
                        </div>
                        <div className="relative w-auto flex justify-center items-center p-3">
                            <div className="absolute flex justify-center items-center ml-7 bottom-8 w-[1.3rem] h-[1.3rem] p-1 rounded-full bg-orange-400 text-white">
                                {quantityProductAdded}
                            </div>
                            <BsCart3 size={30} className="w-full h-full" />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
