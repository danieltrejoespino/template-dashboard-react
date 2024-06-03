
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ProgressSpinner() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h1 className="mb-10 mt-2 text-4xl font-bold tracking-tight text-gray-900">
        Cargando...
      </h1>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress size={100} thickness={5} />
      </Box>
    </div>
  );
}
