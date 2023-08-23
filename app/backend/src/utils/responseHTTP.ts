export default function responseHTTP(status: string): number {
  switch (status) {
    case 'CONFLICT': return 422;
    case 'INVALID_DATA': return 400;
    case 'NOT_FOUND': return 404;
    case 'OK': return 201;
    case 'SUCCESSFUL': return 200;
    case 'UNAUTHORIZED': return 401;
    default: return 500;
  }
}
