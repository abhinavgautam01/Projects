import React, { useEffect } from 'react'
import { useRef, useState } from 'react'


import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [passwordArray, setPasswordArray] = useState([])
    const [ShowPassword, setShowPassword] = useState(false)
    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        let passwordArray
        let setPasswordArray
        if (passwords) {
            setPasswordArray = JSON.parse(passwords)
        }
        else {
            passwordArray = []
        }
    }, [])

    const copyText = (text) => {
        navigator.clipboard.writeText(text)
    }

    const [form, setform] = useState({ site: "", username: "", password: "" })

    const savePassword = () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords :", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })

        }
        else if(form.site.length < 3 && form.username.length < 3 && form.password.length < 3 && form.site.length > 0 && form.username.length > 0 && form.password.length > 0){
            alert("Invalid Entries :  Site/Username/Password..!")
            alert("Check your entries again...!")
            console.log('Error : Password not saved..!')
        }
        else{
            alert("First enter your data to be saved...!")
            console.log('Error : Password not saved..!')
        }
    }


    const deletePassword = (id) => {
        try {
            let c = confirm("Do you really want to delete this password..?")
            if (c) {
                console.log("Deleting password with id :", id);
                setPasswordArray(passwordArray.filter(item => item.id !== id))
                localStorage.setItem("passwords :", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            }
            else {
                console.log("Deletion Cancelled...!")
            }

        }
        catch (error) {
            console.log("Error: ", error)
        }

    }


    const editPassword = (id) => {
        console.log("Editing password with id :", id);
        setform(passwordArray.filter(i => i.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }



    const showPassword = () => {
        // passwordRef.current.type = "text"
        if (ref.current.src.includes("/eyecross.png")) {
            ref.current.src = "/eye.png"
            passwordRef.current.type = "password"
        }
        else {
            passwordRef.current.type = "text"
            ref.current.src = "/eyecross.png"
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>

            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-600 opacity-20 blur-[100px]"></div></div>

            <div className="p-2 md:mycontainer min-h-[83.6vh]">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own password Manager</p>
                <div className="text-black flex flex-col items-center p-4 gap-8">
                    <input value={form.site} onChange={handleChange} className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" placeholder='Enter Website URL' />
                    <div className="flex flex-col md:flex-row w-full gap-8 justify-between">
                        <input value={form.username} onChange={handleChange} className='rounded-full border border-green-500 w-full p-4 py-1' placeholder="Enter Username" type="text" name="username" id="username" />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} className='rounded-full border border-green-500 w-full p-4 py-1' placeholder="Enter Password" type="password" name="password" id="password" />
                            <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='p-1' width={26} src="/eye.png" alt="" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex justify-center gap-2 items-center bg-green-500 rounded-full px-8 py-2 w-fit hover:bg-green-400 border border-green-900 font-bold'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save</button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords : </h2>
                    {passwordArray.length === 0 && <div>No password to show</div>}
                    {passwordArray.length != 0 && <table className='table-auto w-full rounded-xl overflow-hidden mb-10'>
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Website : URL</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password
                                <button
                                                className='ml-2 text-sm bg-green-900 text-red-400 rounded px-2 py-1'
                                                onClick={() => setShowPassword(!ShowPassword)}>
                                                {ShowPassword ? '(Hide)' : '(Show)'}
                                            </button>
                                </th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            {/* <span>{item.password}</span> */}
                                            <span>{ShowPassword ? item.password : '*'.repeat(item.password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-center py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>

                            })}
                        </tbody>
                    </table>}
                </div>
            </div>

        </>
    )
}

export default Manager