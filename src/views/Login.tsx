import { Header } from "@/components/Login/Header";
import { Form } from "@/components/Login/Form";
import { Footer } from "@/components/Login/Footer";

export const Login = () => {

    

    return (
        <section className="flex flex-col justify-between items-center w-full h-full">
            <Header/>
            <Form/>
            <Footer/>
        </section>
    )
}