export interface ModalProps {
    isOpen: boolean;
    modalType: string;
    handleClose: Function;
}

export interface CreateBook {
    name: string;
    word: string;
    description: string;
    avatar: string;
}

export interface UpdateBook extends CreateBook {
    id: number;
}