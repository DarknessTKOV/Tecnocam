document.addEventListener('DOMContentLoaded', function() {
    // Modal de Agendamento
    const bookingModal = document.getElementById('bookingModal');
    const openBookingModal = document.getElementById('openBookingModal');
    const closeBookingModal = document.getElementById('closeBookingModal');
    const cancelBooking = document.getElementById('cancelBooking');
    const bookingForm = document.getElementById('bookingForm');

    // Modal de Solução
    const solutionModal = document.getElementById('solutionModal');
    const closeSolutionModal = document.getElementById('closeSolutionModal');

    // Configurar data mínima para agendamento (amanhã)
    const preferredDate = document.getElementById('preferredDate');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    preferredDate.min = tomorrow.toISOString().split('T')[0];

    // Abrir modal de agendamento
    openBookingModal.addEventListener('click', function() {
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Fechar modais
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    closeBookingModal.addEventListener('click', () => closeModal(bookingModal));
    cancelBooking.addEventListener('click', () => closeModal(bookingModal));
    closeSolutionModal.addEventListener('click', () => closeModal(solutionModal));

    // Fechar modal clicando fora
    window.addEventListener('click', function(e) {
        if (e.target === bookingModal) closeModal(bookingModal);
        if (e.target === solutionModal) closeModal(solutionModal);
    });

    // Envio do formulário de agendamento
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            productType: document.getElementById('productType').value,
            problemDescription: document.getElementById('problemDescription').value,
            preferredDate: document.getElementById('preferredDate').value,
            preferredTime: document.getElementById('preferredTime').value,
            contactPhone: document.getElementById('contactPhone').value
        };

        // Simular envio do agendamento
        simulateBooking(formData);
    });

    function simulateBooking(formData) {
        // Mostrar loading
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Agendando...';
        submitBtn.disabled = true;

        // Simular processamento
        setTimeout(() => {
            // Fechar modal
            closeModal(bookingModal);
            
            // Resetar formulário
            bookingForm.reset();
            
            // Mostrar confirmação
            showNotification('Agendamento realizado com sucesso! Entraremos em contato para confirmar.', 'success');
            
            // Restaurar botão
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    // Soluções para problemas comuns
    const solutions = {
        'wifi-connection': {
            title: 'Câmera não conecta ao Wi-Fi',
            steps: [
                {
                    title: 'Verifique a rede Wi-Fi',
                    description: 'Certifique-se de que o roteador está ligado e a rede está funcionando. Tente conectar outro dispositivo na mesma rede.'
                },
                {
                    title: 'Confira a senha do Wi-Fi',
                    description: 'Verifique se a senha digitada está correta. Lembre-se que senhas são sensíveis a maiúsculas e minúsculas.'
                },
                {
                    title: 'Distância do roteador',
                    description: 'Aproxime a câmera do roteador durante a configuração inicial. Depois pode reposicioná-la.'
                },
                {
                    title: 'Reinicie os dispositivos',
                    description: 'Desligue e ligue o roteador e a câmera. Aguarde 30 segundos antes de tentar novamente.'
                }
            ]
        },
        'image-quality': {
            title: 'Imagem da câmera está ruim',
            steps: [
                {
                    title: 'Limpe a lente',
                    description: 'Use um pano macio e seco para limpar a lente da câmera. Não use produtos químicos.'
                },
                {
                    title: 'Verifique a iluminação',
                    description: 'Evite luz direta no lens. À noite, certifique-se de que o ambiente não está muito escuro para a visão noturna.'
                },
                {
                    title: 'Ajuste a resolução',
                    description: 'No aplicativo, vá em configurações da câmera e selecione a maior resolução disponível.'
                },
                {
                    title: 'Teste a conexão de rede',
                    description: 'Uma conexão lenta pode causar baixa qualidade de imagem. Verifique a velocidade da sua internet.'
                }
            ]
        },
        'app-connection': {
            title: 'App não encontra dispositivos',
            steps: [
                {
                    title: 'Verifique o Bluetooth',
                    description: 'Certifique-se de que o Bluetooth está ativado no seu celular durante a configuração.'
                },
                {
                    title: 'Reinicie o aplicativo',
                    description: 'Feche completamente o app e abra novamente. Às vezes é necessário reiniciar o celular.'
                },
                {
                    title: 'Atualize o aplicativo',
                    description: 'Verifique se você está usando a versão mais recente do aplicativo Tecnocam.'
                },
                {
                    title: 'Modo de configuração',
                    description: 'Certifique-se de que a câmera está no modo de configuração (LED piscando).'
                }
            ]
        },
        'dvr-recording': {
            title: 'DVR não grava',
            steps: [
                {
                    title: 'Verifique o HD',
                    description: 'Confirme se o HD está instalado corretamente e tem espaço disponível.'
                },
                {
                    title: 'Configurações de gravação',
                    description: 'Acesse o menu do DVR e verifique se a gravação está programada e ativada.'
                },
                {
                    title: 'Formatação do HD',
                    description: 'Se for um HD novo, pode ser necessário formatá-lo através do menu do DVR.'
                },
                {
                    title: 'Alimentação elétrica',
                    description: 'Verifique se o DVR está recebendo energia adequadamente e não está em modo de standby.'
                }
            ]
        }
    };

    // Botões de solução
    const solutionButtons = document.querySelectorAll('.solution-btn');
    
    solutionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const problem = this.getAttribute('data-problem');
            showSolution(problem);
        });
    });

    function showSolution(problemKey) {
        const solution = solutions[problemKey];
        if (!solution) return;

        // Atualizar título
        document.getElementById('solutionTitle').textContent = solution.title;
        
        // Atualizar conteúdo
        const solutionContent = document.getElementById('solutionContent');
        solutionContent.innerHTML = '';
        
        solution.steps.forEach((step, index) => {
            const stepElement = document.createElement('div');
            stepElement.className = 'solution-step';
            stepElement.innerHTML = `
                <div class="step-title">
                    <span class="step-number">${index + 1}</span>
                    ${step.title}
                </div>
                <div class="step-description">${step.description}</div>
            `;
            solutionContent.appendChild(stepElement);
        });

        // Abrir modal
        solutionModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Guias rápidos
    const guideButtons = document.querySelectorAll('.guide-btn');
    
    guideButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.guide-card');
            const category = card.getAttribute('data-category');
            showGuideCategory(category);
        });
    });

    function showGuideCategory(category) {
        const guideTitles = {
            'camera': 'Guias para Câmeras',
            'wifi': 'Guias para Wi-Fi e Rede',
            'smart': 'Guias para Casa Inteligente',
            'dvr': 'Guias para DVR/NVR'
        };
        
        showNotification(`Abrindo ${guideTitles[category]}... Em desenvolvimento.`, 'info');
    }

    // Funções de contato
    window.openWhatsApp = function() {
        window.open('https://api.whatsapp.com/send?phone=554188046891&text=Olá! Preciso de suporte técnico.', '_blank');
    };

    window.openEmail = function() {
        window.location.href = 'mailto:tecnico@tecnocam.com?subject=Suporte Técnico Tecnocam';
    };

    // Sistema de notificação
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        // Estilos da notificação
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1001;
            display: flex;
            align-items: center;
            gap: 15px;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Fechar notificação
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto-remover após 5 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Adicionar estilos de animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `;
    document.head.appendChild(style);
});