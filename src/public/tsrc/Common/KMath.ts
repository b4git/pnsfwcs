export const add = (...x: number[]) => {
    return x.reduce( (agv, cv) => agv+cv, 0);
}