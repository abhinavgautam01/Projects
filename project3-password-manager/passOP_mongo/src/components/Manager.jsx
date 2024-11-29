import React, { useEffect } from 'react'
import { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [passwordArray, setPasswordArray] = useState([])
    const [ShowPassword, setShowPassword] = useState(false)

    const getPasswords = async () => {
        try {
            let req = await fetch("http://localhost:3000/");
            if (!req.ok) throw new Error('Failed to fetch passwords');
            let passwords = await req.json();
            
            setPasswordArray(Array.isArray(passwords) ? passwords : []);
        } catch (error) {
            console.error('Error fetching passwords:', error);
        }
    };


    useEffect(() => {
        getPasswords()
    }, [])


    const copyText = (text) => {
        navigator.clipboard.writeText(text)
    }

    const [form, setform] = useState({ site: "", username: "", password: "" })

    const savePassword = async () => {
        try {
            if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
                // Check if the form has an `id` (editing mode)
                if (form.id) {
                    

                    // Remove the old entry from the array
                    setPasswordArray(passwordArray.filter(item => item.id !== form.id));

                    // Delete the old entry from the database
                    await fetch("http://localhost:3000/", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: form.id })
                    });
                }

                // Generate a new `id` for the saved entry and update
                const newEntry = { ...form, id: uuidv4() };
                setPasswordArray([...passwordArray, newEntry]);

                // Save the new entry to the database
                await fetch("http://localhost:3000/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newEntry)
                });

                // Clear the form after saving
                setform({ site: "", username: "", password: "" });
                
            } else if (form.site.length < 3 ||form.username.length < 3 ||form.password.length < 3) {
                alert("Invalid Entries: Site, Username, or Password must be at least 4 characters.");
                
            } else {
                alert("First enter your data to be saved!");
                
            }
        } catch (error) {
            console.error("An error occurred while saving the password:", error);
        }
    };



    const deletePassword = async (id) => {
        try {
            

            let c = confirm("Do you really want to delete this password..?")
            if (c) {
                
                setPasswordArray(passwordArray.filter(item => item.id !== id))
                await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })

            }
            else {
                
            }

        }
        catch (error) {
            
        }

    }

    const editPassword = (id) => {
        

        // Find the item to edit and set it in the form
        const itemToEdit = passwordArray.find(item => item.id === id);
        if (itemToEdit) {
            setform(itemToEdit); // Load the form with the item's details
            const updatedArray = passwordArray.filter(item => item.id !== id);
            setPasswordArray(updatedArray);
        } else {
            console.error("Item not found for editing:", id);
        }
    };




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
                            {passwordArray.length > 0 ? passwordArray.map((item, index) => {
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
                                            <span>{ShowPassword ? item.password : '*'.repeat(item.password?.length)}</span>
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

                            }) : <div>No Passwords to Show..!</div>}
                        </tbody>
                    </table>}
                </div>
            </div>

        </>
    )
}

export default Manager