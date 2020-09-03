export const animatedSkillsStack = ['JavaScript', 'TypeScript', 'React', 'Redux', 'Three.js'];

export const animatedBigSkillsStack = 'HTML5/CSS3   JavaScript   TypeScript   React   Redux   Three.js   styled-components' +
'   React-spring   axios   thunk   etc...';

export type ProjectType = {
    projectName: string,
    projectDescription: string,
    detailedDescription: string,
    pros: string,
    cons: string,
    technologies: string
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
        technologies: "JavaScript React Redux SASS"
    },
    {
        projectName: "To Do List",
        projectDescription: "An application with many interactions",
        detailedDescription: "My second project. Connected to the server API, kindly provided to me by IT-incubator. " +
            "When developing, the main task was to create a beautiful and responsive application with a huge number of all kinds of user interactions. " +
            " Design inspired by Apple's Neumorphism",
        pros: "There are animations and transitions for almost any user action. Data will be sent only when the user accepts the changes that can be canceled" +
            "Changes are made by comparing the original state with the edited one.",
        cons: "Due to the large number of animations and event handlers, performance issues can be observed on slower devices" +
            "The function of comparing states and sending data is difficult to understand for an unprepared person. ",
        technologies: "TypeScript React Redux styled-components react-spring thunk"
    },
    {
        projectName: "The Portfolio",
        projectDescription: "The project that characterizes me",
        detailedDescription: "In my opinion, Three.js is a technology that greatly improves perceptions and user experience." +
            "At least After I got acquainted with this library, I had no doubts about it" +
            "Even if you don't have expensive and beautiful 3d models, you can surprise users with your creativity.",
        pros: "Main advantage of this project is animated canvas in the background that keeps track" +
            " of what you are watching and changes accordingly to it.",
        cons: "Possible performance degradation on devices with weak 3d accelerator",
        technologies: "TypeScript React Redux styled-components react-spring Three.js"
    }];

export const aboutMe = [
    "I'm a simple guy who loves to create unusual things.",
    "New experiences and challenges are my current objectives.",
    "No matter the circumstances, I get my way."
]