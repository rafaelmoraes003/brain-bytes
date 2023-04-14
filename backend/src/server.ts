import { App } from './app';

const app: App = new App();
const PORT: number = Number(process.env.PORT) || 3001;

app.start(PORT);
