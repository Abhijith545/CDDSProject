import React from 'react';
import { Container } from 'reactstrap';

export default function Footer(){
  return (
    <footer className="app-footer">
      <Container className="text-center py-2">
        Powered by <strong>CGG</strong>
      </Container>
    </footer>
  );
}
