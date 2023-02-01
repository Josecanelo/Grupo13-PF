import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { getUserByid } from "../../redux/actions";
import style from "./profile.module.css";
import { useHistory } from 'react-router-dom';
import ProfileInfo from "../UserInfo/UserInfo";
import { useState } from "react";
import MyBookInfo from "../MyBookInfo/myBookInfo";
import LocalsInfo from "../MyLocalsInfo/LocalsInfo";


export default function Detail() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { profile } = useSelector(state => state)
    const checked = useSelector((state) => state.darkmode);
    console.log("🚀 ~ file: Profile.jsx:18 ~ Detail ~ profile", profile)
    const [open, setOpen] = useState({
        userInfo: false,
        myBook: false,
        myLocal: false,
        myLocalBook: false
    });
    useEffect(() => {
        dispatch(getUserByid(profile.id));
    }, [dispatch, profile.id])

    useEffect(() => {
        if (!profile.id) {
            history.push("/login")
        }
    })


    const handleOpen = (e) => {
        setOpen({
            userInfo: false,
            myBook: false,
            myLocal: false,
            myLocalBook: false,
            [e.target.name]: !open[e.target.name]
        })
    }

    const handleCreate = (e) => {
        e.preventDefault();
        history.push("/newplace")
    }

    const handleMyLocals = (e) => {
        history.push("/bar-owner")
    }

    if (!profile) {
        return (
            <div>
                <h3>loading...</h3>
            </div>
        )
    }
    return (
        <div className={style.mainContainer}>

            <div className={checked ? style.profileContainer : style.profileContainerDark}>
                <Navbar />
                <div>
                    <div className={style.divContainer} >
                        <img src={profile.image} href={profile.image} referrerpolicy="no-referrer" alt="perfil photo" className={style.profilePict} />
                        <h1 className={checked ? style.name : style.nameDark}>{profile.name}</h1>
                    </div>


                    <div className={style.infoBarsAndInfoUser}>
                        <div>
                            <button name="userInfo" onClick={handleOpen} className={checked ? style.buttons : style.buttonsDark}>Información de usuario</button>
                            <hr />
                            {open.userInfo
                                ?
                                <div className={style.infoContainer}>
                                    <ProfileInfo profile={profile} />
                                </div>
                                :
                                null}
                        </div>
                        <div className={style.bookInfoContainer}>
                            <button name="myBook" onClick={handleOpen} className={checked ? style.buttons : style.buttonsDark}>Mis reservas</button>
                            <hr />
                            {open.myBook
                                ?
                                (profile.books?.length
                                    ?
                                    <div className={style.bookInfo}>
                                        <MyBookInfo books={profile.books} />
                                    </div>
                                    :
                                    <div>
                                        <h3>Aún no has hecho reservas</h3>
                                        <hr />
                                    </div>
                                )
                                :
                                null}
                        </div>
                        <div>
                            {/* <button name="myLocal" onClick={handleOpen} className={checked ? style.buttons : style.buttonsDark}>Mis locales</button>
                            <hr />
                            {open.myLocal
                                ?
                                profile.locals?.length
                                    ?
                                    <div className={style.localInfo}>
                                        <LocalsInfo profileId={profile.id} locals={profile.locals} />
                                    </div>
                                    :
                                    <div>
                                        <h3>Actualmente no tienes ningún local</h3>
                                        <button onClick={handleCreate} className={style.crearButton}>Crear local</button>
                                        <hr />
                                    </div>
                                :
                                null} */}
                            <button name="myLocal" onClick={handleMyLocals} className={checked ? style.buttons : style.buttonsDark}>Mis locales</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}