'use client'

import React from 'react'
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import { qnaListData } from '@/data/settings/qnaListData';
import { QnaDataType } from '@/types/QnaDataType';

function qna() {
  return (
    <Accordion>
      {
      qnaListData.map((e:QnaDataType) => (
      <AccordionItem key={e.id} aria-label="Accordion 1" title={e.title}>
        {e.description}
      </AccordionItem>
      ))
      }
    </Accordion>
  )
}

export default qna