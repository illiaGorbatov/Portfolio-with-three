import video from "../assets/videos/testVid.mp4";
import counter from "../assets/videos/counter.mp4";
import todoList from "../assets/videos/toDoList.mp4";

export const errorMessage = 'Please, turn your device horizontally.';

export const animatedSkillsStack = ['JavaScript', 'TypeScript', 'React', 'Redux', 'Three.js'];

export const animatedBigSkillsStack = 'HTML5/CSS3   JavaScript   TypeScript   React   Redux   Three.js   styled-components' +
'   React-spring   axios   thunk   etc...';

export type ProjectType = {
    projectName: string,
    projectDescription: string,
    detailedDescription: string,
    pros: string,
    cons: string,
    technologies: string,
    color: string,
    refToProject: string,
    refToGit: string,
    video: any
} ;
export const projectsInfo: ProjectType[] = [
    {
        projectName: "The Counter",
        projectDescription: "My first project",
        detailedDescription: "The project everyone started with. It doesn't have much logic, but looks not so bad. " +
            "I think that it is not a shame to show it to someone",
        pros: "The project is responsive and has a nice appearance. There are two display modes. " +
            "It also has advanced input validation with a set of messages for each error.",
        cons: "Slight short-term performance degradation may occur when switching modes. The validation logic is quite bulky",
        technologies: "JavaScript React Redux SASS",
        color: '#847EA0',
        refToProject: 'https://illiagorbatov.github.io/counter/',
        refToGit: 'https://github.com/illiaGorbatov/counter',
        video: counter
    },
    {
        projectName: "To Do List",
        projectDescription: "An application with many interactions",
        detailedDescription: "My second project. Connected to the server API, kindly provided to me by IT-incubator. " +
            "When developing, the main task was to create a beautiful and responsive application with a huge number of all kinds of user interactions. " +
            " Design inspired by Apple's Neumorphism",
        pros: "There are animations and transitions for almost any user action. Data will be sent only when the user accepts the changes that can be canceled. " +
            "Changes are made by comparing the original state with the edited one.",
        cons: "Due to the large number of animations and event handlers, performance issues can be observed on slower devices" +
            "The function of comparing states and sending data is difficult to understand for an unprepared person. ",
        technologies: "TypeScript React Redux styled-components react-spring thunk",
        color: '#EAE8DE',
        refToProject: 'https://illiagorbatov.github.io/ToDoList/',
        refToGit: 'https://github.com/illiaGorbatov/ToDoList',
        video: todoList
    },
    {
        projectName: "The Portfolio",
        projectDescription: "The project that characterizes me",
        detailedDescription: "In my opinion, Three.js is a technology that greatly improves perceptions and user experience. " +
            "At least After I got acquainted with this library, I had no doubts about it. " +
            "Even if you don't have expensive and beautiful 3d models, you can surprise users with your creativity.",
        pros: "Main advantage of this project is animated canvas in the background that keeps track" +
            " of what you are watching and changes accordingly to it.",
        cons: "Possible performance degradation on devices with weak 3d accelerator",
        technologies: "TypeScript React Redux styled-components react-spring Three.js",
        color: "#ff0000",
        refToProject: 'https://illiagorbatov.github.io/Portfolio-with-three/',
        refToGit: 'https://github.com/illiaGorbatov/Portfolio-with-three',
        video: video
    }];

export const aboutMe = [
    "I'm a simple guy who likes to create unusual things.",
    "New experiences and challenges are my current objectives.",
    "No matter the circumstances, I get my way."
];

export const contacts = [
    {header: 'Linked', href: ''},
    {header: 'GitHub', href: 'https://github.com/illiaGorbatov'},
    {header: 'vk', href: 'https://vk.com/mur0mec'},
    {header: 'telegram', href: 'https://vk.com/mur0mec'},
]