import BookForm from '@/components/Books/BookForm/BookForm';
import Page from '@/components/Page/Page';
import React, { FC } from 'react'

const Create: FC = () =>{
  return (
    <Page>
      <BookForm />
    </Page>
  )
}

export default Create;