'use client'
import { TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
const MainPage = () => {
    const [text, setText] = useState('')
    const [count, setCount] = useState(1)
    const [details, setDetails] = useState<any>()
    const listInnerRef = useRef(null);
 
    function seachText() {
        fetch("https://api.github.com/search/users?q="+text+"&page=1").then(response => response.json())
            .then(data => {
                setDetails(data)
            })
    }
    function onScroll(){
        const { scrollTop, scrollHeight, clientHeight } =
            listInnerRef.current as any;
        if (listInnerRef.current && scrollTop && scrollHeight && clientHeight) {
            if (Math.round(scrollTop + clientHeight) >= scrollHeight - 2) {
                setCount(count+1)
                fetch("https://api.github.com/search/users?q="+text+"&page="+count).then(response => response.json())
                .then(data => {
                    let oldData = details
                    data?.items?.map((each:any)=>{
                      oldData?.items?.push(each)
                    })
                    console.log(oldData?.items?.length,"len")
                    setDetails(oldData)
                })
            }
        }
    }
    
    console.log(details, "details>>",count)
    return (
        <div className="h-screen w-screen p-4 relative overflow-y-scroll"ref={listInnerRef} onScroll={() => {
            onScroll()
        }} >
            <div>
                <TextField
                    className="w-full"
                    onChange={(evt) => { setText(evt?.target?.value) }}
                >
                </TextField>
                <SearchIcon className="absolute right-10 top-[2rem]" onClick={()=>{seachText()}}/>
            </div>
            <div className="grid grid-cols-6 mt-5 w-full">
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
                                        <div>Score:{" "}{each?.score}</div>
                                    </div>
                                </div>
                            </div>
                    )
                })}
            </div>
        </div>
    )
}
export default MainPage;