import React, { useState, useEffect } from "react";
import styles from '../../page.module.css';

import HomePage from "../landing/homePage";

export default function LoginForm({ formType }) {  
    const initialFormData = {
        email: '',
        password: '',
    }  
    const [formData, setFormData] = useState(initialFormData);
    const [loginResult, setLoginResult] = useState('');
    const [nextPage, setNextPage] = useState(false);

    async function onChange(event) {
        const { name, value } = event.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    async function checkLoginResult() {
        if (loginResult === 'Success') {
            setNextPage(true);
        }
        else {
            setNextPage(false);
            return; // some sort of try again modal or
                    // refresh the page with all the
                    // fields filled besides the password
        }
    }

    async function onSubmit(event) {
        event.preventDefault();

        let data = JSON.stringify(formData);
        const response = await fetch('/api/login', {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await response.json();
        console.log(`result: ${result.message}`);

        setLoginResult(result.message);
        setFormData(initialFormData);

        checkLoginResult();
    }

    if (nextPage) {
        return <HomePage />
    }

    return (
        <div className={styles.formBody}>
            <form onSubmit={onSubmit} className={styles.form}>

                <label>Email</label>
                <input
                onChange={onChange}
                type="email"
                className={styles.input}
                name="email"
                value={formData.email}
                />

                <label>Password</label>
                <input
                onChange={onChange}
                type="password"
                className={styles.input}
                name="password"
                value={formData.password}
                />

                <button
                type="submit"
                className={styles.formButton}>Submit</button>

                <p
                onClick={() => formType('Sign Up')}
                className={styles.pText}
                value='Sign Up'
                >New User? Sign Up</p>
            </form>
        </div>
    )
}