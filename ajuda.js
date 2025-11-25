document.addEventListener('DOMContentLoaded', function() {
    // Sistema de FAQ interativo
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Fecha todos os outros itens
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Abre/fecha o item atual
            item.classList.toggle('active');
        });
    });

    // Sistema de busca na ajuda
    const helpSearch = document.getElementById('helpSearch');
    const faqList = document.querySelector('.faq-list');
    
    // Dados das FAQs para busca
    const faqData = [
        {
            question: 'Como rastrear meu pedido?',
            answer: 'Para rastrear seu pedido, acesse "Meus Pedidos" em sua conta e clique no pedido desejado. Lá você encontrará o código de rastreamento e o link para acompanhar a entrega.',
            category: 'pedidos'
        },
        {
            question: 'Qual o prazo de entrega?',
            answer: 'O prazo de entrega varia de 3 a 10 dias úteis, dependendo da sua localização. Pedidos feitos com KosmoFull têm entrega mais rápida, geralmente em 2-5 dias úteis.',
            category: 'pedidos'
        },
        {
            question: 'Como faço para trocar um produto?',
            answer: 'Você tem 30 dias para solicitar a troca. Acesse "Meus Pedidos", selecione o produto e clique em "Solicitar Troca". Nossa equipe entrará em contato em até 48h.',
            category: 'trocas'
        },
        {
            question: 'Quais formas de pagamento são aceitas?',
            answer: 'Aceitamos cartão de crédito (até 12x), débito, PIX (com 10% de desconto), boleto bancário e transferência. Todas as transações são 100% seguras.',
            category: 'pagamentos'
        },
        {
            question: 'Como instalar minha câmera?',
            answer: 'Oferecemos serviço de instalação profissional. Você pode contratar durante a compra ou posteriormente. Também disponibilizamos manuais e tutoriais em vídeo.',
            category: 'suporte'
        },
        {
            question: 'Meu produto chegou com defeito, o que fazer?',
            answer: 'Entre em contato conosco imediatamente pelo WhatsApp ou e-mail. Iremos orientar sobre o processo de troca ou conserto conforme a garantia do produto.',
            category: 'trocas'
        },
        {
            question: 'Como funciona a garantia dos produtos?',
            answer: 'Todos os produtos têm garantia de 12 meses contra defeitos de fabricação. A garantia cobre conserto ou troca do produto, conforme avaliação técnica.',
            category: 'trocas'
        },
        {
            question: 'Posso cancelar meu pedido?',
            answer: 'Sim, pedidos podem ser cancelados até 2 horas após a compra. Após esse período, entre em contato para verificar a possibilidade de cancelamento.',
            category: 'pedidos'
        },
        {
            question: 'Como altero meu endereço de entrega?',
            answer: 'Acesse "Minha Conta" > "Meus Endereços" para gerenciar seus endereços. Para pedidos já realizados, entre em contato conosco o mais rápido possível.',
            category: 'pedidos'
        },
        {
            question: 'O que fazer se esqueci minha senha?',
            answer: 'Clique em "Esqueci minha senha" na página de login. Enviaremos um e-mail com instruções para redefinir sua senha.',
            category: 'conta'
        }
    ];

    // Função para buscar nas FAQs
    function searchFAQs(query) {
        if (!query.trim()) {
            renderFAQs(faqData);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const results = faqData.filter(faq => 
            faq.question.toLowerCase().includes(lowerQuery) ||
            faq.answer.toLowerCase().includes(lowerQuery) ||
            faq.category.toLowerCase().includes(lowerQuery)
        );

        renderFAQs(results, query);
    }

    // Função para renderizar as FAQs
    function renderFAQs(faqs, highlightQuery = '') {
        faqList.innerHTML = '';

        if (faqs.length === 0) {
            faqList.innerHTML = `
                <div class="no-results">
                    <span class="material-symbols-outlined">search_off</span>
                    <h3>Nenhum resultado encontrado</h3>
                    <p>Tente usar outras palavras-chave ou entre em contato conosco.</p>
                </div>
            `;
            return;
        }

        faqs.forEach(faq => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            
            const highlightedQuestion = highlightQuery ? 
                highlightText(faq.question, highlightQuery) : faq.question;
            const highlightedAnswer = highlightQuery ? 
                highlightText(faq.answer, highlightQuery) : faq.answer;

            faqItem.innerHTML = `
                <div class="faq-question">
                    <span>${highlightedQuestion}</span>
                    <span class="material-symbols-outlined">expand_more</span>
                </div>
                <div class="faq-answer">
                    <p>${highlightedAnswer}</p>
                </div>
            `;

            // Adiciona event listener para o novo item
            const questionElement = faqItem.querySelector('.faq-question');
            questionElement.addEventListener('click', function() {
                // Fecha todos os outros itens
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                    }
                });
                
                // Abre/fecha o item atual
                faqItem.classList.toggle('active');
            });

            faqList.appendChild(faqItem);
        });
    }

    // Função para destacar texto na busca
    function highlightText(text, query) {
        if (!query.trim()) return text;
        
        const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<mark class="search-highlight">$1</mark>');
    }

    // Event listener para a busca
    helpSearch.addEventListener('input', function() {
        searchFAQs(this.value);
    });

    // Navegação por categoria
    const categoryLinks = document.querySelectorAll('.category-link');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('href').substring(1); // Remove o #
            
            const categoryFAQs = faqData.filter(faq => faq.category === category);
            renderFAQs(categoryFAQs);
            
            // Scroll para a seção de FAQ
            document.querySelector('.faq-section').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Botões de contato
    const contactButtons = document.querySelectorAll('.btn-primary');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.contact-card');
            const service = card.querySelector('h3').textContent;
            
            switch(service) {
                case 'WhatsApp':
                    window.open('https://api.whatsapp.com/send?phone=554188046891&text=Preciso de ajuda', '_blank');
                    break;
            }
        });
    });

    // Tecla Enter na busca
    helpSearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchFAQs(this.value);
        }
    });

    // CSS adicional para highlights e estados
    const style = document.createElement('style');
    style.textContent = `
        .search-highlight {
            background-color: #fff9c4;
            padding: 2px 4px;
            border-radius: 3px;
            font-weight: 600;
        }
        
        .no-results {
            text-align: center;
            padding: 40px 20px;
            color: var(--muted);
        }
        
        .no-results .material-symbols-outlined {
            font-size: 48px;
            margin-bottom: 15px;
            opacity: 0.5;
        }
        
        .no-results h3 {
            font-size: 18px;
            margin-bottom: 10px;
            color: var(--preto-carvao);
        }
        
        .no-results p {
            font-size: 14px;
        }
        
        .faq-item {
            transition: all 0.3s ease;
        }
        
        .faq-item.active {
            border-color: var(--dourado);
        }
        
        mark.search-highlight {
            background: linear-gradient(120deg, #fff9c4 0%, #fff9c4 100%);
            color: inherit;
        }
    `;
    document.head.appendChild(style);

    // Inicializa as FAQs
    renderFAQs(faqData);
});

// Funções globais para links de categoria (caso precise)
function showCategory(category) {
    const event = new Event('click');
    const categoryLink = document.querySelector(`.category-link[href="#${category}"]`);
    if (categoryLink) {
        categoryLink.dispatchEvent(event);
    }
}