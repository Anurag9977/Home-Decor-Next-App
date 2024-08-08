"use client";

function error({ error }: { error: Error }) {
  console.log(error);
  return <div>cart error</div>;
}
export default error;
