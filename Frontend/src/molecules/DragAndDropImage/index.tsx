import React, { ChangeEventHandler, DragEventHandler, FC, MouseEventHandler, useCallback, useRef, useState } from 'react';
import classNames from 'classnames';
import ImageIcon from '@mui/icons-material/Image';
import CloseIcon from '@mui/icons-material/Close';

import './index.css';
import { readFilesAsDataURL } from '../../common/readFilesAsDataURL';

interface DragAndDropImageProps {
    className?: string;
    name?: string;
    onChange: (imageSrc: string) => void;
}

const DragAndDropImage: FC<DragAndDropImageProps> = ({
    className,
    name,
    onChange,
}) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const timerRef = useRef<number>();
    const [dropImage, setDropImage] = useState<string>();

    const handleChange = useCallback(async (imageFile: File) => {
        const [dropImage] = await readFilesAsDataURL([imageFile]);
        setDropImage(dropImage.src);
        onChange(dropImage.src);
    }, [onChange]);

    const handleInputChange: ChangeEventHandler<HTMLInputElement> = useCallback(async (e) => {
        if (e.currentTarget.files) {
            const files = Array.from(e.currentTarget.files);
            await handleChange(files[0]);
        }
    }, [handleChange]);

    const onDrop: DragEventHandler<HTMLLabelElement> = useCallback(async (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const arrImageFiles = Array.from(e.dataTransfer.files);

        if (arrImageFiles.length > 0) {
            await handleChange(arrImageFiles[0]);
        }
    }, [handleChange]);

    const onDragOver: DragEventHandler<HTMLLabelElement> = useCallback((e) => {
        e.preventDefault();
        window.clearTimeout(timerRef.current);
        setIsDragOver(true);
    }, []);

    const onDragLeave: DragEventHandler<HTMLLabelElement> = useCallback(() => {
        window.clearTimeout(timerRef.current);
        timerRef.current = window.setTimeout(() => {
            setIsDragOver(false);
        }, 100);
    }, []);

    const handleDeleteImage: MouseEventHandler<SVGSVGElement> = useCallback((e) => {
        e.stopPropagation();
        e.preventDefault();
        setDropImage('');
        onChange('');
    }, [setDropImage, onChange]);

    return (
        <label
            className={classNames(className, 'DragAndDropImage__wrap')}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            {dropImage
                ? (
                    <>
                        <img className="DragAndDropImage__dropImage" src={dropImage} alt="dropImage"/>
                        <CloseIcon onClick={handleDeleteImage} className="DragAndDropImage__removeImage" />
                    </>
                )
                : (
                    <div className={classNames('DragAndDropImage__main', {
                        ['DragAndDropImage__mainActive']: isDragOver,
                    })}>
                        {isDragOver
                            ? <ImageIcon className="DragAndDropImage__image" />
                            : <div className={classNames('DragAndDropImage__image', 'DragAndDropImage__imageDrag')}></div>
                        }
                    </div>
                )
            }
            <input
                type="file"
                accept="image/*"
                hidden
                name={name}
                onChange={handleInputChange}
            />
        </label>
    );
};

export default DragAndDropImage;
