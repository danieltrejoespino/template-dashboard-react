import {Header} from './Header';

export const Home = () => {
  return (
    <div>
      <Header />
      <p>This is the home page content.</p>

      <a href='https://172.20.1.97:3009/api-serv/testApi' target="_blank" >
      Prueba
      </a>

      <p>fuser -k -n tcp 8080</p>
    </div>
  );
};

