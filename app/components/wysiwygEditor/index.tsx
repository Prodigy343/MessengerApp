import type { LinksFunction } from '@remix-run/node'
import { useEffect, useRef, useState } from 'react'
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

const modifiersTag = {
  italic: 'i',
  bold: 'b',
  underline: 'u',
  code: 'code',
  strikethrough: 'strike',
}

const findLeafNode = (element: HTMLElement | null | undefined) => {
  if (element === null || element === undefined) return null
  let currentElement: HTMLElement = element
  while (currentElement.children.length !== 0) {
    currentElement = currentElement.children[element.children.length - 1] as HTMLElement
  }
  return currentElement
}

const subTreeToParent = (tagToFind: string, element: HTMLElement | null | undefined) => {
  if (element === null || element === undefined) return document.createElement('p')
  let currentElement: HTMLElement = element
  let currentTag: string = ''
  const path = []
  while (currentElement.parentElement) {
    currentElement = currentElement.parentElement
    currentTag = currentElement.tagName.toLowerCase()
    if (currentTag === tagToFind) break
    path.unshift(currentTag)
  }

  if (currentElement.parentElement === null) return document.createElement('p')
  let parentTarget: HTMLElement = currentElement.parentElement
  let newestChild: HTMLElement | null = null
  path.forEach(tag => {
    newestChild = document.createElement(tag)
    parentTarget.append(newestChild)
    parentTarget.appendChild(newestChild)
    parentTarget = newestChild
  });
  return newestChild
}

export const WysiwygComponent = ({ className }: { className: string }) => {
  const placeholder = 'Write your message here'
  const chatBox = useRef<HTMLDivElement>(null)
  const [message, setMessage] = useState(placeholder)
  const [highlighted, setHighlighted] = useState({ text: '', offset: -1 })
  const [activeModifiers, setActiveModifiers] = useState<Modifiers>({
    italic: false,
    bold: false,
    underline: false,
    code: false,
    strikethrough: false
  })

  const addModifierToMessage = (modifier: keyof Modifiers) => {
    console.log(highlighted)
    const windowSelection: Selection | null = window.getSelection()
    const chatBoxLastChild: HTMLElement | null = findLeafNode(document.getElementById('chatbox'))
    let element: HTMLElement

    if (!windowSelection?.rangeCount) return

    if (activeModifiers[modifier]) {
      element = subTreeToParent(modifiersTag[modifier], windowSelection.focusNode as HTMLElement)
      const newRange = document.createRange()
      element.innerHTML = '\u00a0'
      newRange.selectNodeContents(element)
      console.log('if -')
      console.log(element)
      windowSelection.removeAllRanges()
      windowSelection.addRange(newRange)
      //document.execCommand('delete', false, undefined)
    } else {
      element = document.createElement(modifiersTag[modifier])
      chatBoxLastChild?.append(element)
      chatBoxLastChild?.appendChild(element)
      const newRange = document.createRange()
      element.innerHTML = '\u00a0'
      newRange.selectNodeContents(element)
      console.log('else -')
      console.log(element)
      windowSelection.removeAllRanges()
      windowSelection.addRange(newRange)
      document.execCommand('delete', false, undefined)
    }

    // const newRange = document.createRange()
    // element.innerHTML = '\u00a0'
    // newRange.selectNodeContents(element)
    // windowSelection.removeAllRanges()
    // windowSelection.addRange(newRange)
    // document.execCommand('delete', false, undefined)
  }

  const handleChange = (e: any) => {
    setMessage(e.target.innerHTML)
  }

  const handleModifiersClick = (modifier: keyof Modifiers) => {
    addModifierToMessage(modifier)
    if (chatBox && chatBox.current) chatBox.current.focus()
    setActiveModifiers({
      ...activeModifiers,
      [modifier]: !activeModifiers[modifier]
    })
  }

  const handleSelection = () => {
    const selection = window.getSelection()
    const text: string = selection?.toString() ?? ''
    const offset: number = selection?.focusOffset ?? -1
    setHighlighted({
      text,
      offset: text.length ? offset : -1
    })
  }

  return (
    <div className={`${className} wysiwyg-container`}>
      <div className='wrapper'>
        <div id='chatbox' contentEditable suppressContentEditableWarning ref={chatBox} onMouseUp={handleSelection} onInput={handleChange} placeholder={placeholder} className='max-h-full flex editor-box px-[15px]'>
          <p>&nbsp;</p>
        </div>
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
            <button className='send-btn bg-green-600 m-0 p-[3px] px-[8px]'><AiOutlineSend color='white' /></button>
          </div>
        </div>
      </div>
    </div>
  )
}
