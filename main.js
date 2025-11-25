// main.js - Funcionalidades gerais do site
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== MAIN.JS INICIALIZADO ===');

    // ===== SISTEMA DE MODO ESCURO =====
    function initThemeToggle() {
        console.log('🎯 Iniciando sistema de modo escuro...');
        
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle?.querySelector('.material-symbols-outlined');
        
        console.log('Elementos encontrados:', {
            themeToggle: themeToggle,
            themeIcon: themeIcon
        });

        // função aplicar tema
        function applyTheme(isDark) {
            console.log('Aplicando tema:', isDark ? 'ESCURO' : 'CLARO');
            
            // aplicar/remover classe no body
            if (isDark) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
            
            // atualizar interface
            updateThemeUI(isDark);
            
            // salvar preferência
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            console.log('✅ Tema aplicado com sucesso');
        }

        // atualizar interface do botão
        function updateThemeUI(isDark) {
            // atualizar ícone
            if (themeIcon) {
                themeIcon.textContent = isDark ? 'light_mode' : 'dark_mode';
                console.log('Ícone atualizado:', themeIcon.textContent);
            }
            
            // atualizar texto do botão
            const textSpan = themeToggle?.querySelector('span:not(.material-symbols-outlined)');
            if (textSpan) {
                textSpan.textContent = isDark ? 'Modo Claro' : 'Modo Escuro';
                console.log('Texto atualizado:', textSpan.textContent);
            }
        }

        // determinar tema inicial
        function getInitialTheme() {
            // verificar localStorage
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                console.log('📁 Tema do localStorage:', savedTheme);
                return savedTheme === 'dark';
            }
            
            // verificar preferência do sistema
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                console.log('🌙 Preferência do sistema: escuro');
                return true;
            }
            
            // padrão: modo claro
            console.log('☀️ Tema padrão: claro');
            return false;
        }

        // aplicar tema inicial ao carregar a página
        const initialDarkMode = getInitialTheme();
        applyTheme(initialDarkMode);

        // configurar evento de clique
        if (themeToggle) {
            themeToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log('🖱️ Botão de tema clicado');
                
                // verificar estado atual e alternar
                const currentIsDark = document.body.classList.contains('dark-mode');
                const newIsDark = !currentIsDark;
                
                console.log('Alternando de', currentIsDark ? 'escuro' : 'claro', 'para', newIsDark ? 'escuro' : 'claro');
                
                applyTheme(newIsDark);
            });
            
            console.log('✅ Event listener do tema configurado');
        } else {
            console.error('❌ Botão themeToggle não encontrado!');
            
            // debug: listar todos os botões
            const allButtons = document.querySelectorAll('button, .dropdown-item');
            console.log('Todos os botões encontrados:', allButtons);
        }

        // ouvir mudanças na preferência do sistema
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                // só aplicar se não tiver preferência salva
                if (!localStorage.getItem('theme')) {
                    console.log('🔄 Preferência do sistema alterada:', e.matches ? 'escuro' : 'claro');
                    applyTheme(e.matches);
                }
            });
        }
        
        console.log('✅ Sistema de modo escuro configurado');
    }

    // ===== SISTEMA DE SCROLL SUAVE =====
    function initSmoothScroll() {
        const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
        console.log('🔗 Links de navegação encontrados:', navLinks.length);
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    console.log('📜 Scroll suave para:', targetId);
                } else {
                    console.warn('⚠️ Elemento alvo não encontrado:', targetId);
                }
            });
        });
    }

    // ===== SISTEMA DO CARROSSEL =====
    function initCarousel() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');
        
        console.log('🎠 Elementos do carrossel:', {
            slides: slides.length,
            dots: dots.length,
            prevButton: !!prevButton,
            nextButton: !!nextButton
        });
        
        if (slides.length === 0 || !prevButton || !nextButton) {
            console.log('⏭️ Carrossel não encontrado, pulando inicialização');
            return;
        }
        
        let currentSlide = 0;
        let interval;

        // função mostrar slide
        function showSlide(index) {
            console.log('🖼️ Mostrando slide:', index);
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            slides[index].classList.add('active');
            if (dots[index]) {
                dots[index].classList.add('active');
            }
            currentSlide = index;
        }

        // função próximo slide
        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            console.log('➡️ Próximo slide:', nextIndex);
            showSlide(nextIndex);
        }

        // função slide anterior
        function prevSlide() {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            console.log('⬅️ Slide anterior:', prevIndex);
            showSlide(prevIndex);
        }

        // função iniciar carrossel
        function startCarousel() {
            if (interval) {
                clearInterval(interval);
                console.log('🔄 Carrossel reiniciado');
            }
            interval = setInterval(nextSlide, 5000);
        }

        // função parar carrossel
        function stopCarousel() {
            if (interval) {
                clearInterval(interval);
                console.log('⏸️ Carrossel pausado');
            }
        }

        // event listeners para os dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                console.log('🔘 Dot clicado:', index);
                showSlide(index);
                startCarousel();
            });
        });

        // event listeners para botões de navegação
        prevButton.addEventListener('click', () => {
            console.log('⬅️ Botão anterior clicado');
            prevSlide();
            startCarousel();
        });

        nextButton.addEventListener('click', () => {
            console.log('➡️ Botão próximo clicado');
            nextSlide();
            startCarousel();
        });

        // pausar carrossel ao passar o mouse
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopCarousel);
            carouselContainer.addEventListener('mouseleave', startCarousel);
        }

        // inicializar
        showSlide(currentSlide);
        startCarousel();
        console.log('✅ Carrossel inicializado com sucesso');
    }

    // ===== SISTEMA DE BUSCA =====
    function initSearch() {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.querySelector('.search-results');
        
        console.log('🔍 Elementos de busca:', {
            searchInput: !!searchInput,
            searchResults: !!searchResults
        });

        if (!searchInput || !searchResults) {
            console.log('⏭️ Sistema de busca não encontrado, pulando inicialização');
            return;
        }

        // simulação de busca de produtos
        function searchProducts(query) {
            const products = [
                { name: 'Câmera Inteligente 4MP Branca', category: 'Câmeras', url: 'produto.html' },
                { name: 'Interfone Digital 7" Tela LCD', category: 'Interfones', url: 'interfone.html' },
                { name: 'Fechadura Biométrica MFR 7000', category: 'Casa Inteligente', url: 'fechadura.html' },
                { name: 'Kit Segurança Completo 4 Câmeras', category: 'Kits', url: 'kit.html' },
                { name: 'Serviço de Instalação Profissional', category: 'Instalação', url: 'instalacao.html' },
                { name: 'Câmera Wi-Fi 360°', category: 'Câmeras', url: 'camera-wifi.html' },
                { name: 'Sensor de Movimento PIR', category: 'Sensores', url: 'sensor.html' },
                { name: 'Alarme Residencial Sem Fio', category: 'Alarmes', url: 'alarme.html' }
            ];
            
            if (!query.trim()) {
                console.log('🔍 Busca vazia');
                return [];
            }
            
            console.log('🔍 Buscando por:', query);
            const results = products.filter(product => 
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            );
            
            console.log('📦 Resultados encontrados:', results.length);
            return results;
        }

        // função mostrar resultados
        function showResults(results) {
            searchResults.innerHTML = '';
            
            if (results.length === 0) {
                const noResults = document.createElement('div');
                noResults.className = 'search-result-item no-results';
                noResults.textContent = 'Nenhum produto encontrado';
                searchResults.appendChild(noResults);
                console.log('❌ Nenhum resultado encontrado');
            } else {
                results.forEach(result => {
                    const item = document.createElement('a');
                    item.href = result.url;
                    item.className = 'search-result-item';
                    item.innerHTML = `
                        <div class="result-content">
                            <strong class="result-title">${result.name}</strong>
                            <span class="result-category">${result.category}</span>
                        </div>
                        <span class="material-symbols-outlined result-arrow">chevron_right</span>
                    `;
                    
                    item.addEventListener('click', function() {
                        console.log('✅ Produto selecionado:', result.name);
                        searchResults.classList.remove('active');
                        searchInput.value = '';
                    });
                    
                    searchResults.appendChild(item);
                });
                console.log(`✅ ${results.length} resultados exibidos`);
            }
            
            searchResults.classList.add('active');
        }

        // função esconder resultados
        function hideResults() {
            searchResults.classList.remove('active');
            console.log('👁️ Resultados escondidos');
        }

        // event listeners
        searchInput.addEventListener('input', function() {
            const query = this.value;
            const results = searchProducts(query);
            showResults(results);
        });

        searchInput.addEventListener('focus', function() {
            const query = this.value;
            if (query.trim()) {
                const results = searchProducts(query);
                showResults(results);
            }
        });

        searchInput.addEventListener('blur', function() {
            // pequeno delay para permitir clique nos resultados
            setTimeout(hideResults, 200);
        });

        // fechar resultados ao clicar fora
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && (!searchResults || !searchResults.contains(e.target))) {
                hideResults();
            }
        });

        // tecla ESC para fechar
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                hideResults();
                this.blur();
            }
            
            // Enter para primeiro resultado
            if (e.key === 'Enter') {
                e.preventDefault();
                const firstResult = searchResults.querySelector('.search-result-item');
                if (firstResult && !firstResult.classList.contains('no-results')) {
                    firstResult.click();
                }
            }
        });

        console.log('✅ Sistema de busca inicializado');
    }

    // ===== MENU DROPDOWN PARA MOBILE =====
    function initMobileMenu() {
        // verificar se é página de produto
        const isProductPage = document.querySelector('.product-page');
        if (isProductPage) {
            console.log('⏭️ Página de produto detectada - dropdown controlado pelo produto.js');
            return;
        }

        const menuIcon = document.querySelector('.menu-icon');
        const dropdownMenu = document.querySelector('.dropdown-menu');
        
        console.log('📱 Elementos do menu mobile:', {
            menuIcon: !!menuIcon,
            dropdownMenu: !!dropdownMenu
        });

        if (menuIcon && dropdownMenu) {
            // função toggle menu
            function toggleMenu() {
                dropdownMenu.classList.toggle('active');
                console.log('🍔 Menu toggle:', dropdownMenu.classList.contains('active'));
            }

            // função fechar menu
            function closeMenu() {
                dropdownMenu.classList.remove('active');
                console.log('❌ Menu fechado');
            }

            // event listener para o ícone do menu
            menuIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                toggleMenu();
            });

            // fechar menu ao clicar fora
            document.addEventListener('click', function(e) {
                if (!menuIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
                    closeMenu();
                }
            });

            // fechar menu ao clicar em um item
            const dropdownItems = dropdownMenu.querySelectorAll('.dropdown-item');
            dropdownItems.forEach(item => {
                item.addEventListener('click', function() {
                    setTimeout(closeMenu, 300);
                });
            });

            // tecla ESC para fechar
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && dropdownMenu.classList.contains('active')) {
                    closeMenu();
                }
            });

            console.log('✅ Menu mobile inicializado');
        } else {
            console.log('⏭️ Elementos do menu mobile não encontrados');
        }
    }

    // ===== SISTEMA DE LOADING =====
    function initLoadingSystem() {
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        const totalImages = images.length;

        if (totalImages === 0) return;

        // função imagem carregada
        function imageLoaded() {
            loadedImages++;
            console.log(`🖼️ Imagens carregadas: ${loadedImages}/${totalImages}`);
            
            if (loadedImages === totalImages) {
                console.log('✅ Todas as imagens foram carregadas');
                document.body.classList.add('images-loaded');
            }
        }

        images.forEach(img => {
            if (img.complete) {
                imageLoaded();
            } else {
                img.addEventListener('load', imageLoaded);
                img.addEventListener('error', imageLoaded);
            }
        });
    }

    // ===== SISTEMA DE ANALYTICS =====
    function initAnalytics() {
        console.log('📊 Página carregada:', {
            url: window.location.href,
            viewport: `${window.innerWidth}x${window.innerHeight}`
        });

        // track clicks em produtos
        const productLinks = document.querySelectorAll('.product-card a, .produto a');
        productLinks.forEach(link => {
            link.addEventListener('click', function() {
                const productName = this.querySelector('img')?.alt || this.textContent;
                console.log('🛒 Produto clicado:', productName);
            });
        });

        // track interações importantes
        const addToCartButtons = document.querySelectorAll('.cart-btn, .buy-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                console.log('💰 Ação de compra clicada:', this.textContent.trim());
            });
        });
    }

    // ===== INICIALIZAÇÃO DE TODOS OS SISTEMAS =====
    console.log('🚀 Inicializando todas as funcionalidades...');
    
    initThemeToggle();
    initSmoothScroll();
    initCarousel();
    initSearch();
    initMobileMenu();
    initLoadingSystem();
    initAnalytics();
    
    console.log('✅ === MAIN.JS INICIALIZAÇÃO CONCLUÍDA ===');

    // debug final
    console.log('🔍 Elementos importantes:', {
        themeToggle: document.getElementById('themeToggle') ? '✅ Encontrado' : '❌ Não encontrado',
        searchInput: document.getElementById('searchInput') ? '✅ Encontrado' : '❌ Não encontrado',
        carousel: document.querySelector('.carousel') ? '✅ Encontrado' : '❌ Não encontrado',
        productPage: document.querySelector('.product-page') ? '✅ Página de produto' : '❌ Página normal'
    });
});