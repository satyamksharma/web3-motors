import React, { useState, useContext } from "react";
import { AppState } from "../App";
import { ethers } from "ethers";
const Contributors = () => {
    const App = useContext(AppState);
    const [Amount, setAmount] = useState();

    const Contribut = async () => {
        try {
            const tx = await App.Charitycontract.sendEth({
                value: ethers.utils.parseEther(Amount),
            });
            await tx.wait();
            alert("Donated Sucessfull!");
            setAmount("");
        } catch (error) {
            if (error.message === "MetaMask Tx Signature: User denied transaction signature.") {
                alert(" User denied transaction signature.");
            } else {
                console.log(error.message);
                alert("Something went wrong");
            }
        }
    };
    return (
        <div>
            <section className='text-gray-600 body-font'>
                <div className='container px-5 py-24 mx-auto'>
                    <div className='flex flex-col text-center w-full mb-12'>
                        <h1 className='sm:text-5xl text-2xl font-medium title-font mb-4 text-gray-900'>
                            Contribute to a Cause!
                        </h1>
                        <p className='lg:w-2/3 mx-auto text-lg leading-relaxed'>
                            Listen to that little voice inside your head, and make a small
                            contribution towards a good cause.
                        </p>
                    </div>
                    <div className='flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end'>
                        <div className='relative flex-grow w-full'>
                            <label
                                htmlFor='full-name'
                                className='leading-7 text-lg font-semibold text-gray-600 my-2'
                            >
                                Amount in ETH
                            </label>
                            <input
                                value={Amount}
                                onChange={(e) => setAmount(e.target.value)}
                                type='text'
                                id='full-name'
                                name='full-name'
                                className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-yellow-500 focus:bg-transparent focus:ring-2  text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out focus:bg-gray-100 mt-2'
                            />
                        </div>
                        <button
                            onClick={() => Contribut()}
                            className='text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg transition duration-150'
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contributors;
