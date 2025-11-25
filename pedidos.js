document.addEventListener('DOMContentLoaded', function() {
    // dados dos pedidos
    const ordersData = [
        {
            id: 'TECNO456789',
            date: '15/12/2024',
            status: 'delivered',
            statusText: 'Entregue',
            items: [
                {
                    name: 'Câmera Inteligente IM7 + 3MP Branca Tecnocam',
                    image: 'img/im7.png',
                    quantity: 1,
                    price: 'R$ 401,14'
                }
            ],
            total: 'R$ 401,14'
        },
        {
            id: 'TECNO123456',
            date: '10/12/2024',
            status: 'shipping',
            statusText: 'Em transporte',
            items: [
                {
                    name: 'Roteador Wireless Tecnocam RF 301k Preto',
                    image: 'img/roteador.png',
                    quantity: 2,
                    price: 'R$ 360,32'
                },
                {
                    name: 'Telefone sem Fio Tecnocam TS 3110 Preto',
                    image: 'img/phone.png',
                    quantity: 1,
                    price: 'R$ 182,61'
                }
            ],
            total: 'R$ 542,93'
        },
        {
            id: 'TECNO789012',
            date: '05/12/2024',
            status: 'pending',
            statusText: 'Processando',
            items: [
                {
                    name: 'Câmera Inteligente Wi-Fi iM5 SC Full HD Tecnocam',
                    image: 'img/bullet.png',
                    quantity: 1,
                    price: 'R$ 322,12'
                }
            ],
            total: 'R$ 322,12'
        },
        {
            id: 'TECNO345678',
            date: '01/12/2024',
            status: 'cancelled',
            statusText: 'Cancelado',
            items: [
                {
                    name: 'Fechadura Digital Tecnocam',
                    image: 'img/fechadura.svg',
                    quantity: 1,
                    price: 'R$ 589,90'
                }
            ],
            total: 'R$ 589,90'
        }
    ];

    const filterButtons = document.querySelectorAll('.filter-btn');
    const ordersList = document.querySelector('.orders-list');
    let currentFilter = 'all';

    // função renderizar pedidos
    function renderOrders(filter = 'all') {
        const filteredOrders = filter === 'all' 
            ? ordersData 
            : ordersData.filter(order => order.status === filter);

        ordersList.innerHTML = '';

        if (filteredOrders.length === 0) {
            ordersList.innerHTML = `
                <div class="no-orders">
                    <span class="material-symbols-outlined">inventory_2</span>
                    <h3>Nenhum pedido encontrado</h3>
                    <p>Não há pedidos com esse status no momento.</p>
                </div>
            `;
            return;
        }

        filteredOrders.forEach(order => {
            const orderCard = document.createElement('div');
            orderCard.className = 'order-card';
            
            orderCard.innerHTML = `
                <div class="order-header">
                    <div class="order-info">
                        <div class="order-number">Pedido #${order.id}</div>
                        <div class="order-date">Realizado em ${order.date}</div>
                    </div>
                    <div class="order-status ${order.status}">
                        <span class="material-symbols-outlined">${getStatusIcon(order.status)}</span>
                        ${order.statusText}
                    </div>
                </div>
                
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <img src="${item.image}" alt="${item.name}" class="item-image">
                            <div class="item-details">
                                <h3 class="item-name">${item.name}</h3>
                                <div class="item-quantity">Quantidade: ${item.quantity}</div>
                            </div>
                            <div class="item-price">${item.price}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="order-footer">
                    <div class="order-total">
                        <strong>Total: ${order.total}</strong>
                    </div>
                    <div class="order-actions">
                        <button class="btn-secondary" onclick="viewOrderDetails('${order.id}')">Ver detalhes</button>
                        ${getActionButton(order.status, order.id)}
                    </div>
                </div>
            `;
            
            ordersList.appendChild(orderCard);
        });
    }

    // função obter ícone do status
    function getStatusIcon(status) {
        const icons = {
            'delivered': 'check_circle',
            'shipping': 'local_shipping',
            'pending': 'pending',
            'cancelled': 'cancel'
        };
        return icons[status] || 'help';
    }

    // função obter botão de ação
    function getActionButton(status, orderId) {
        const actions = {
            'delivered': `<button class="btn-primary" onclick="buyAgain('${orderId}')">Comprar novamente</button>`,
            'shipping': `<button class="btn-primary" onclick="trackOrder('${orderId}')">Acompanhar pedido</button>`,
            'pending': `<button class="btn-primary" onclick="cancelOrder('${orderId}')">Cancelar pedido</button>`,
            'cancelled': `<button class="btn-primary" onclick="buyAgain('${orderId}')">Comprar novamente</button>`
        };
        return actions[status] || `<button class="btn-primary" onclick="viewOrderDetails('${orderId}')">Ver detalhes</button>`;
    }

    // event listeners para filtros
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // remove classe active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // adiciona classe active ao botão clicado
            this.classList.add('active');
            
            // obtém filtro do texto do botão
            const filterText = this.textContent.trim().toLowerCase();
            let filter = 'all';
            
            // mapeia texto para filtro correspondente
            if (filterText === 'pendentes') filter = 'pending';
            else if (filterText === 'em transporte') filter = 'shipping';
            else if (filterText === 'entregues') filter = 'delivered';
            else if (filterText === 'cancelados') filter = 'cancelled';
            
            currentFilter = filter;
            renderOrders(filter);
        });
    });

    // função visualizar detalhes pedido
    window.viewOrderDetails = function(orderId) {
        alert(`Visualizando detalhes do pedido: ${orderId}`);
        // redirecionar para página de detalhes ou abrir modal
    };

    // função comprar novamente
    window.buyAgain = function(orderId) {
        alert(`Adicionando itens do pedido ${orderId} ao carrinho`);
        // lógica para adicionar itens ao carrinho
    };

    // função acompanhar pedido
    window.trackOrder = function(orderId) {
        alert(`Acompanhando pedido: ${orderId}`);
        // lógica para rastreamento de pedido
    };

    // função cancelar pedido
    window.cancelOrder = function(orderId) {
        if (confirm('Tem certeza que deseja cancelar este pedido?')) {
            alert(`Pedido ${orderId} cancelado com sucesso`);
            // atualizar status do pedido no array e re-renderizar
            const orderIndex = ordersData.findIndex(order => order.id === orderId);
            if (orderIndex !== -1) {
                ordersData[orderIndex].status = 'cancelled';
                ordersData[orderIndex].statusText = 'Cancelado';
                renderOrders(currentFilter);
            }
        }
    };

    // css adicional para estado nenhum pedido
    const style = document.createElement('style');
    style.textContent = `
        .no-orders {
            text-align: center;
            padding: 60px 20px;
            color: var(--muted);
        }
        
        .no-orders .material-symbols-outlined {
            font-size: 64px;
            margin-bottom: 20px;
            opacity: 0.5;
        }
        
        .no-orders h3 {
            font-size: 20px;
            margin-bottom: 10px;
            color: var(--preto-carvao);
        }
        
        .no-orders p {
            font-size: 14px;
        }
    `;
    document.head.appendChild(style);

    // renderiza pedidos inicialmente
    renderOrders();
});