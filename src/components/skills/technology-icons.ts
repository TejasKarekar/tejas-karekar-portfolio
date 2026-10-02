import { Binary, Braces, BrainCircuit, Cloud, Code2, Database, GitBranch, Server, Smartphone, Wrench } from 'lucide-react'

export const categoryIcons = { Mobile: Smartphone, Frontend: Braces, Backend: Server, 'Data & Cloud': Database, 'AI / ML': BrainCircuit, Tools: Wrench }
export const technologyIcons = { Kotlin: Code2, Android: Smartphone, 'Jetpack Compose': Braces, Flutter: Smartphone, React: Braces, TypeScript: Braces, JavaScript: Braces, HTML: Code2, CSS: Code2, Vite: Binary, 'Node.js': Server, 'Express.js': Server, Python: Code2, Flask: Server, Firebase: Database, Firestore: Database, MongoDB: Database, MySQL: Database, AWS: Cloud, OpenCV: BrainCircuit, TensorFlow: BrainCircuit, 'TensorFlow Lite': BrainCircuit, 'Machine Learning': BrainCircuit, Git: GitBranch, GitHub: GitBranch, 'Android Studio': Wrench, 'VS Code': Code2 }
export type TechnologyName = keyof typeof technologyIcons
export type TechnologyCategory = keyof typeof categoryIcons
