'use client'
import { TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from "next/navigation";
import CloseIcon from '@mui/icons-material/Close';
const MainPage = () => {
    const [text, setText] = useState('')
    const [count, setCount] = useState(1)
    const [details, setDetails] = useState<any>()
    const listInnerRef = useRef(null);
    const router = useRouter()
    const cloneDeep = require('clone-deep');
    function seachText() {
        if (text != '')
            fetch("https://api.github.com/search/users?q=" + text + "&page=1").then(response => response.json())
                .then(data => {
                    setDetails(cloneDeep(data))
                })
    }
    function onScroll() {
        const { scrollTop, scrollHeight, clientHeight } =
            listInnerRef.current as any;
        if (listInnerRef.current && scrollTop && scrollHeight && clientHeight) {
            if (Math.round(scrollTop + clientHeight) >= scrollHeight - 2) {
                setCount(count + 1)
                fetch("https://api.github.com/search/users?q=" + text + "&page=" + count).then(response => response.json())
                    .then(data => {
                        let oldData = details
                        data?.items?.map((each: any) => {
                            oldData?.items?.push(each)
                        })
                        setDetails(cloneDeep(oldData))
                    })
            }
        }
    }

    useEffect(() => {
        if (text?.length == 0) {
            setDetails(cloneDeep(null))
        }
    }, [text])


    return (
        <div className="h-screen w-screen px-4  overflow-y-scroll" ref={listInnerRef} onScroll={() => {
            onScroll()
        }} >
            <div className="sticky top-0 bg-white">
                <div className="text-lg font-bold py-4">GitHub Profile Searches</div>
                <div className="relative pb-2">
                    <TextField
                        className="w-full"
                        placeholder="Search name......"
                        value={text}
                        onChange={(evt) => { setText(evt?.target?.value) }}
                    >
                    </TextField>
                    {text && details ? (
                        <CloseIcon className="absolute right-[15px] top-[1rem] cursor-pointer" onClick={() => { setText('') }} />
                    ) : (
                        <SearchIcon className="absolute right-[15px] top-[1rem] cursor-pointer" onClick={() => { seachText() }} />
                    )}
                </div>
            </div>
            {details == null || details == '' ? (
                <div className="pt-40 md:pt-0">
                    <div className="flex justify-center">
                        <img src="https://allvectorlogo.com/img/2021/12/github-logo-vector.png" alt="" />
                    </div>
                    <div className="flex justify-center">
                        <div className="text-base font-semibold">No Profile's found.Start Searching.......</div>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="hidden md:block">
                        <div className="grid grid-cols-6 mt-5 w-full ">
                            {details && details?.items?.map((each: any, index: number) => {
                                return (
                                    <div className="border-2 p-3 col-span-3 m-3" key={index}>
                                        <div className="flex justify-start gap-6">
                                            <div>
                                                <img src={each?.avatar_url} className="h-20 w-20" alt="" />
                                            </div>
                                            <div>
                                                <div>Id:{" "}{each?.id}</div>
                                                <div>UserName:{" "}{each?.login}</div>
                                                <div className="pb-1.5">Score:{" "}{each?.score}</div>
                                                <span className=" border-2 py-1 px-5 rounded-lg" onClick={() => window.open(("https://github.com/" + (each?.login)), "_blank")}>Follow</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="block md:hidden">
                        <div className="grid grid-cols-6 mt-5 w-full ">
                            {details && details?.items?.map((each: any, index: number) => {
                                return (
                                    <div className="border-2 p-3 col-span-6 m-3" key={index}>
                                        <div className="flex justify-start gap-6">
                                            <div>
                                                <img src={each?.avatar_url} className="h-20 w-20" alt="" />
                                            </div>
                                            <div>
                                                <div>Id:{" "}{each?.id}</div>
                                                <div>UserName:{" "}{each?.login}</div>
                                                <div className="pb-1.5">Score:{" "}{each?.score}</div>
                                                <span className=" border-2 py-1 px-5 rounded-lg" onClick={() => window.open(("https://github.com/" + (each?.login)), "_blank")}>Follow</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}
export default MainPage;