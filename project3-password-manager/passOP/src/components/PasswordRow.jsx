import React, { useState } from 'react';

function PasswordRow({ item }) {
    const [ShowPassword, setShowPassword] = useState(false);

    return (
        <>
        <td className='py-2 border border-white text-center'>
            <div className='flex items-center justify-center'>
                <span>{ShowPassword ? item.password : '*'.repeat(item.password.length)}</span>
                <div
                    className='lordiconcopy size-7 cursor-pointer'
                    onClick={() => { copyText(item.password); }}
                >
                    <lord-icon
                        style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                        src="https://cdn.lordicon.com/iykgtsbt.json"
                        trigger="hover"
                    ></lord-icon>
                </div>
                <button
                    className='ml-2 text-sm bg-gray-200 rounded px-2 py-1'
                    onClick={() => setShowPassword(!ShowPassword)}
                >
                    {ShowPassword ? 'Hide' : 'Show'}
                </button>
            </div>
        </td>
        </>
    );
}

export default PasswordRow