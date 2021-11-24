import { useState, useEffect} from 'react'
import DeizuPlaceholderImg from '../img/deizuFavicon.png'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, dataRef } from '../firebase';


export default function ThemeButton(props) {
    const [user] = useAuthState(auth);
    const [systemCornerStyle, setSystemCornerStyle] = useState(props.systemCornerStyle);
    let cornerData = props.cornerData;
    
    useEffect(() => {
        setSystemCornerStyle(cornerData);
    }, [systemCornerStyle])
    
    const saveTheme = () => {
        console.log(systemCornerStyle)
        dataRef.doc(user.uid).set({
        theme: systemCornerStyle
        }, { merge: true });
        alert('テーマが保存されました。変更を見るにはページをリロードする必要がございます。');
    }

    return (
        <section
            className="themeBtn"
            onClick={saveTheme}
        >
            <img alt="no img found" src={props.btnImg ? props.btnImg :DeizuPlaceholderImg} />
            <p>{props.btnName}</p>
        </section>
    )
}
