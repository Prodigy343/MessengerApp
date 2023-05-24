import type { LinksFunction } from '@remix-run/node'
import { useRef, useState } from 'react'
import { AiOutlineSend } from '@react-icons/all-files/ai/AiOutlineSend'
import { AiOutlineItalic } from '@react-icons/all-files/ai/AiOutlineItalic'
import { AiOutlineBold } from '@react-icons/all-files/ai/AiOutlineBold'
import { AiOutlineUnderline } from '@react-icons/all-files/ai/AiOutlineUnderline'
import { BsCodeSlash } from '@react-icons/all-files/bs/BsCodeSlash'
import { AiOutlineStrikethrough } from '@react-icons/all-files/ai/AiOutlineStrikethrough'
import componentStylesheetUrl from './styles.css?inline'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet', href: componentStylesheetUrl
  }
]

interface Modifiers {
  italic: boolean;
  bold: boolean;
  underline: boolean;
  code: boolean;
  strikethrough: boolean;
}

export const WysiwygComponent = ({ className }: { className: string }) => {

  const placeholder = 'Write your message here'
  const chatBox = useRef<HTMLDivElement>(null)
  const [activeModifiers, setActiveModifiers] = useState<Modifiers>({
    italic: false,
    bold: false,
    underline: false,
    code: false,
    strikethrough: false
  })

  const handleModifiersClick = (modifier: keyof Modifiers) => {
    document.execCommand(modifier, false);
    if (chatBox && chatBox.current) chatBox.current.focus()
    setActiveModifiers({
      ...activeModifiers,
      [modifier]: !activeModifiers[modifier]
    })
  }

  const sendMessage = () => {
    console.log(chatBox.current?.innerHTML)
  }

  return (
    <div className={`${className} wysiwyg-container`}>
      <div className='wrapper'>
        <div
          id='chatbox'
          contentEditable
          suppressContentEditableWarning
          ref={chatBox}
          placeholder={placeholder}
          className='max-h-full flex editor-box px-[15px]'
        />
        <hr />
        <div className='flex bottom-options min-h-[43px] h-[43px] w-full'>
          <div className='option-container flex w-auto'>
            <button className={`option ${activeModifiers.italic && 'active'}`} onClick={() => handleModifiersClick('italic')}><AiOutlineItalic /></button>
            <button className={`option ${activeModifiers.bold && 'active'}`} onClick={() => handleModifiersClick('bold')}><AiOutlineBold /></button>
            <button className={`option ${activeModifiers.underline && 'active'}`} onClick={() => handleModifiersClick('underline')}><AiOutlineUnderline /></button>
            <button className={`option ${activeModifiers.code && 'active'}`} onClick={() => handleModifiersClick('code')}><BsCodeSlash /></button>
            <button className={`option ${activeModifiers.strikethrough && 'active'}`} onClick={() => handleModifiersClick('strikethrough')}><AiOutlineStrikethrough /></button>
          </div>
          <div className='send-container flex ml-auto w-10'>
            <button onClick={sendMessage} className='send-btn bg-green-600 m-0 p-[3px] px-[8px]'><AiOutlineSend color='white' /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
