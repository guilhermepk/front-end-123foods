import { BsGithub, BsInstagram, BsLinkedin, BsTwitch } from "react-icons/bs";

export const TEAMS = {
    front: [{
        nome: "Emanuelle Vodiani",
        foto: "/imagens/manu.jpeg",
        cargo: ["Front-end", "Designer"],
        socialMidia: [{
            icon: BsGithub,
            link: "https://github.com/ManuVodi"
        },
        {
            icon: BsInstagram,
            link: "https://www.instagram.com/manu_vodi/"
        },
        {
            icon: BsLinkedin,
            link: "https://www.linkedin.com/in/emanuelle-vodiani-272280291/"
        }]
    }],
    designer: [
        {
            nome: "Emanuelle Vodiani",
            foto: "/imagens/manu.jpeg",
            cargo: ["Front-end", "Designer"],
            socialMidia: [{
                icon: BsGithub,
                link: "https://github.com/ManuVodi" 
            },
            {
                icon: BsInstagram,
                link: "https://www.instagram.com/manu_vodi/"
            },
            {
                icon: BsLinkedin,
                link: "https://www.linkedin.com/in/emanuelle-vodiani-272280291/"
            }]
        },
        {
            nome: "Gabriel Taschner Eddine",
            foto: "imagens/gabriel.jpeg",
            cargo: ["Front-end", "Designer"],
            socialMidia: [{
                icon: BsTwitch,
                link: "https://www.twitch.tv/ztaschner"
            },
            {
                icon: BsGithub,
                link: "https://github.com/zTaschner"
            },
            {
                icon: BsInstagram,
                link: "https://www.instagram.com/gabriel_taschner/"
            }]
        }
    ],
    back: [{
        nome: "",
        cargo: [],
        socialMidia: [{
            icon: "",
            link: ""
        }]
    }]
}