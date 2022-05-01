export const deleateModal = (
   event: any, 
   setModal: React.Dispatch<any>,
   nameBlocks:string[],
) => {
   (event.target.className === nameBlocks[0] ||
   event.target.className === nameBlocks[1]) &&
   setModal(false) 
}