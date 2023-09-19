import axios from 'axios';
const Addressdelete= async(addresId)=>{
console.log('adrress:',addresId)

        try {
            await axios.delete(`http://localhost:3000/address/${addresId}`);
        } catch (error) {
            console.error('Erro ao excluir banner:', error);
        }
        setTimeout(() => { 
            window.location.reload(); 
          });
}

export default Addressdelete;