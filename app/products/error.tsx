"use client";

function error({ error }: { error: Error }) {
  console.log(error);
  return <div>error</div>;
}
export default error;
